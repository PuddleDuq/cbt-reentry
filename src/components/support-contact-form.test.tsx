import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { SupportContactForm } from "./support-contact-form";
import type { SupportContact, Result, StorageError } from "@/lib/types";

function ok(): Result<void, StorageError> {
  return { ok: true, value: undefined };
}

function err(message: string): Result<void, StorageError> {
  return { ok: false, error: { type: "PARSE_ERROR", message } };
}

describe("SupportContactForm", () => {
  let onAdd: ReturnType<typeof vi.fn>;
  let onRemove: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onAdd = vi.fn(() => ok());
    onRemove = vi.fn(() => ok());
  });

  describe("displaying contacts", () => {
    it("renders existing contacts with name, role badge, and tappable phone link", () => {
      const contacts: SupportContact[] = [
        { name: "Marcus", role: "Sponsor", phone: "(555) 123-4567" },
      ];

      render(
        <SupportContactForm onAdd={onAdd} contacts={contacts} onRemove={onRemove} />
      );

      expect(screen.getByText("Marcus")).toBeInTheDocument();
      expect(screen.getByText("Sponsor")).toBeInTheDocument();

      const phoneLink = screen.getByRole("link", { name: /Call Marcus/i });
      expect(phoneLink).toHaveAttribute("href", "tel:(555) 123-4567");
      expect(phoneLink).toHaveTextContent("(555) 123-4567");
    });

    it("renders a remove button for each contact", () => {
      const contacts: SupportContact[] = [
        { name: "Alice", role: "Counselor", phone: "555-1111" },
        { name: "Bob", role: "Friend", phone: "555-2222" },
      ];

      render(
        <SupportContactForm onAdd={onAdd} contacts={contacts} onRemove={onRemove} />
      );

      expect(screen.getByLabelText("Remove Alice")).toBeInTheDocument();
      expect(screen.getByLabelText("Remove Bob")).toBeInTheDocument();
    });

    it("calls onRemove with correct index when remove button is clicked", () => {
      const contacts: SupportContact[] = [
        { name: "Alice", role: "Counselor", phone: "555-1111" },
        { name: "Bob", role: "Friend", phone: "555-2222" },
      ];

      render(
        <SupportContactForm onAdd={onAdd} contacts={contacts} onRemove={onRemove} />
      );

      fireEvent.click(screen.getByLabelText("Remove Bob"));
      expect(onRemove).toHaveBeenCalledWith(1);
    });

    it("shows nothing when contacts list is empty", () => {
      render(
        <SupportContactForm onAdd={onAdd} contacts={[]} onRemove={onRemove} />
      );

      expect(screen.queryByRole("list")).not.toBeInTheDocument();
    });
  });

  describe("form fields", () => {
    it("renders name, role, and phone inputs with labels", () => {
      render(
        <SupportContactForm onAdd={onAdd} contacts={[]} onRemove={onRemove} />
      );

      expect(screen.getByLabelText("Contact name")).toBeInTheDocument();
      expect(screen.getByLabelText("Their role")).toBeInTheDocument();
      expect(screen.getByLabelText("Phone number")).toBeInTheDocument();
    });

    it("has placeholder text on inputs", () => {
      render(
        <SupportContactForm onAdd={onAdd} contacts={[]} onRemove={onRemove} />
      );

      expect(screen.getByPlaceholderText("Someone you trust")).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Sponsor/)).toBeInTheDocument();
      expect(screen.getByPlaceholderText("(555) 123-4567")).toBeInTheDocument();
    });
  });

  describe("adding a contact", () => {
    it("calls onAdd with trimmed values on submit", () => {
      render(
        <SupportContactForm onAdd={onAdd} contacts={[]} onRemove={onRemove} />
      );

      fireEvent.change(screen.getByLabelText("Contact name"), {
        target: { value: "  Jane Doe  " },
      });
      fireEvent.change(screen.getByLabelText("Their role"), {
        target: { value: "  Counselor  " },
      });
      fireEvent.change(screen.getByLabelText("Phone number"), {
        target: { value: "  555-9876  " },
      });
      fireEvent.click(screen.getByRole("button", { name: "Add contact" }));

      expect(onAdd).toHaveBeenCalledWith({
        name: "Jane Doe",
        role: "Counselor",
        phone: "555-9876",
      });
    });

    it("clears the form after a successful add", () => {
      render(
        <SupportContactForm onAdd={onAdd} contacts={[]} onRemove={onRemove} />
      );

      fireEvent.change(screen.getByLabelText("Contact name"), {
        target: { value: "Jane" },
      });
      fireEvent.change(screen.getByLabelText("Their role"), {
        target: { value: "Friend" },
      });
      fireEvent.change(screen.getByLabelText("Phone number"), {
        target: { value: "555-0000" },
      });
      fireEvent.click(screen.getByRole("button", { name: "Add contact" }));

      expect(screen.getByLabelText("Contact name")).toHaveValue("");
      expect(screen.getByLabelText("Their role")).toHaveValue("");
      expect(screen.getByLabelText("Phone number")).toHaveValue("");
    });

    it("does not clear the form when onAdd returns an error", () => {
      onAdd.mockReturnValue(err("Section is full."));

      render(
        <SupportContactForm onAdd={onAdd} contacts={[]} onRemove={onRemove} />
      );

      fireEvent.change(screen.getByLabelText("Contact name"), {
        target: { value: "Jane" },
      });
      fireEvent.change(screen.getByLabelText("Their role"), {
        target: { value: "Friend" },
      });
      fireEvent.change(screen.getByLabelText("Phone number"), {
        target: { value: "555-0000" },
      });
      fireEvent.click(screen.getByRole("button", { name: "Add contact" }));

      expect(screen.getByLabelText("Contact name")).toHaveValue("Jane");
      expect(screen.getByText("Section is full.")).toBeInTheDocument();
    });
  });

  describe("validation", () => {
    it("shows error when name is empty", () => {
      render(
        <SupportContactForm onAdd={onAdd} contacts={[]} onRemove={onRemove} />
      );

      fireEvent.change(screen.getByLabelText("Their role"), {
        target: { value: "Sponsor" },
      });
      fireEvent.change(screen.getByLabelText("Phone number"), {
        target: { value: "555-0000" },
      });
      fireEvent.click(screen.getByRole("button", { name: "Add contact" }));

      expect(screen.getByText("Please enter a contact name.")).toBeInTheDocument();
      expect(onAdd).not.toHaveBeenCalled();
    });

    it("shows error when name exceeds 100 characters", () => {
      render(
        <SupportContactForm onAdd={onAdd} contacts={[]} onRemove={onRemove} />
      );

      fireEvent.change(screen.getByLabelText("Contact name"), {
        target: { value: "a".repeat(101) },
      });
      fireEvent.change(screen.getByLabelText("Their role"), {
        target: { value: "Sponsor" },
      });
      fireEvent.change(screen.getByLabelText("Phone number"), {
        target: { value: "555-0000" },
      });
      fireEvent.click(screen.getByRole("button", { name: "Add contact" }));

      expect(
        screen.getByText("Contact name must be 100 characters or fewer.")
      ).toBeInTheDocument();
      expect(onAdd).not.toHaveBeenCalled();
    });

    it("shows error when role is empty", () => {
      render(
        <SupportContactForm onAdd={onAdd} contacts={[]} onRemove={onRemove} />
      );

      fireEvent.change(screen.getByLabelText("Contact name"), {
        target: { value: "Jane" },
      });
      fireEvent.change(screen.getByLabelText("Phone number"), {
        target: { value: "555-0000" },
      });
      fireEvent.click(screen.getByRole("button", { name: "Add contact" }));

      expect(screen.getByText("Please enter their role.")).toBeInTheDocument();
      expect(onAdd).not.toHaveBeenCalled();
    });

    it("shows error when role exceeds 50 characters", () => {
      render(
        <SupportContactForm onAdd={onAdd} contacts={[]} onRemove={onRemove} />
      );

      fireEvent.change(screen.getByLabelText("Contact name"), {
        target: { value: "Jane" },
      });
      fireEvent.change(screen.getByLabelText("Their role"), {
        target: { value: "a".repeat(51) },
      });
      fireEvent.change(screen.getByLabelText("Phone number"), {
        target: { value: "555-0000" },
      });
      fireEvent.click(screen.getByRole("button", { name: "Add contact" }));

      expect(
        screen.getByText("Role must be 50 characters or fewer.")
      ).toBeInTheDocument();
      expect(onAdd).not.toHaveBeenCalled();
    });

    it("shows error when phone is empty", () => {
      render(
        <SupportContactForm onAdd={onAdd} contacts={[]} onRemove={onRemove} />
      );

      fireEvent.change(screen.getByLabelText("Contact name"), {
        target: { value: "Jane" },
      });
      fireEvent.change(screen.getByLabelText("Their role"), {
        target: { value: "Friend" },
      });
      fireEvent.click(screen.getByRole("button", { name: "Add contact" }));

      expect(screen.getByText("Please enter a phone number.")).toBeInTheDocument();
      expect(onAdd).not.toHaveBeenCalled();
    });

    it("displays errors in an aria-live region", () => {
      render(
        <SupportContactForm onAdd={onAdd} contacts={[]} onRemove={onRemove} />
      );

      fireEvent.click(screen.getByRole("button", { name: "Add contact" }));

      const errorRegion = screen.getByText("Please enter a contact name.").closest("[aria-live]");
      expect(errorRegion).toHaveAttribute("aria-live", "polite");
    });
  });

  describe("phone links", () => {
    it("renders phone numbers as tappable tel: links", () => {
      const contacts: SupportContact[] = [
        { name: "Crisis Line", role: "24/7 support", phone: "988" },
      ];

      render(
        <SupportContactForm onAdd={onAdd} contacts={contacts} onRemove={onRemove} />
      );

      const link = screen.getByRole("link", { name: /Call Crisis Line/i });
      expect(link).toHaveAttribute("href", "tel:988");
      expect(link).toHaveTextContent("988");
    });
  });
});
