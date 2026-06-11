"use client";

import { useState } from "react";
import type { SupportContact, Result, StorageError } from "@/lib/types";

const MAX_NAME_LENGTH = 100;
const MAX_ROLE_LENGTH = 50;

interface SupportContactFormProps {
  onAdd: (contact: SupportContact) => Result<void, StorageError>;
  contacts: SupportContact[];
  onRemove: (index: number) => Result<void, StorageError>;
}

export function SupportContactForm({
  onAdd,
  contacts,
  onRemove,
}: SupportContactFormProps) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);

  function validate(): string | null {
    const trimmedName = name.trim();
    const trimmedRole = role.trim();
    const trimmedPhone = phone.trim();

    if (trimmedName.length === 0) {
      return "Please enter a contact name.";
    }
    if (trimmedName.length > MAX_NAME_LENGTH) {
      return `Contact name must be ${MAX_NAME_LENGTH} characters or fewer.`;
    }
    if (trimmedRole.length === 0) {
      return "Please enter their role.";
    }
    if (trimmedRole.length > MAX_ROLE_LENGTH) {
      return `Role must be ${MAX_ROLE_LENGTH} characters or fewer.`;
    }
    if (trimmedPhone.length === 0) {
      return "Please enter a phone number.";
    }
    return null;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    const result = onAdd({
      name: name.trim(),
      role: role.trim(),
      phone: phone.trim(),
    });

    if (!result.ok) {
      setError(result.error.message);
      return;
    }

    // Clear form on successful add
    setName("");
    setRole("");
    setPhone("");
    setError(null);
  }

  function handleRemove(index: number) {
    const result = onRemove(index);
    if (!result.ok) {
      setError(result.error.message);
    }
  }

  return (
    <div className="space-y-4">
      {/* Existing contacts list */}
      {contacts.length > 0 && (
        <ul className="space-y-3" aria-label="Support contacts">
          {contacts.map((contact, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-surface-warm rounded-lg px-4 py-3"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-foreground truncate">
                  {contact.name}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-block text-xs bg-secondary/20 text-foreground px-2 py-0.5 rounded-full">
                    {contact.role}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 ml-3">
                <a
                  href={`tel:${contact.phone}`}
                  className="text-sm text-primary font-medium hover:underline min-h-[44px] min-w-[44px] flex items-center justify-center touch-action-manipulation"
                  aria-label={`Call ${contact.name} at ${contact.phone}`}
                >
                  {contact.phone}
                </a>
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="text-muted hover:text-danger text-sm min-h-[44px] min-w-[44px] flex items-center justify-center touch-action-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 rounded"
                  aria-label={`Remove ${contact.name}`}
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Add contact form */}
      <form onSubmit={handleSubmit} className="space-y-3" noValidate>
        <div>
          <label
            htmlFor="contact-name"
            className="block text-sm font-medium text-foreground mb-1"
          >
            Contact name
          </label>
          <input
            id="contact-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={MAX_NAME_LENGTH}
            placeholder="Someone you trust"
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 text-sm min-h-[44px] touch-action-manipulation"
            aria-describedby={error ? "contact-form-error" : undefined}
          />
        </div>

        <div>
          <label
            htmlFor="contact-role"
            className="block text-sm font-medium text-foreground mb-1"
          >
            Their role
          </label>
          <input
            id="contact-role"
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            maxLength={MAX_ROLE_LENGTH}
            placeholder='e.g., "Sponsor", "Counselor", "Family"'
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 text-sm min-h-[44px] touch-action-manipulation"
            aria-describedby={error ? "contact-form-error" : undefined}
          />
        </div>

        <div>
          <label
            htmlFor="contact-phone"
            className="block text-sm font-medium text-foreground mb-1"
          >
            Phone number
          </label>
          <input
            id="contact-phone"
            type="tel"
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(555) 123-4567"
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 text-sm min-h-[44px] touch-action-manipulation"
            aria-describedby={error ? "contact-form-error" : undefined}
          />
        </div>

        {/* Error region */}
        <div
          id="contact-form-error"
          aria-live="polite"
          aria-atomic="true"
          className="min-h-[1.25rem]"
        >
          {error && (
            <p className="text-sm text-danger" role="alert">
              {error}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full px-4 py-3 rounded-lg bg-primary text-white text-sm font-medium min-h-[44px] touch-action-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 hover:bg-primary-dark transition-colors"
        >
          Add contact
        </button>
      </form>
    </div>
  );
}
