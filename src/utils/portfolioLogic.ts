import type { SolutionCategory, SolutionItem } from '../data/zauviqData';

export interface DialogueFormValues {
  name: string;
  organization: string;
  email: string;
  topics: string[];
  message: string;
}

export interface DialogueValidationErrors {
  name?: string;
  email?: string;
  topics?: string;
  message?: string;
}

export interface DialogueValidationResult {
  isValid: boolean;
  errors: DialogueValidationErrors;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function filterSolutions(
  solutions: readonly SolutionItem[],
  category: SolutionCategory
): SolutionItem[] {
  if (category === 'All') {
    return [...solutions];
  }
  return solutions.filter((item) => item.category === category);
}

export function validateDialogueForm(
  values: DialogueFormValues
): DialogueValidationResult {
  const errors: DialogueValidationErrors = {};
  const trimmedName = values.name.trim();
  const trimmedEmail = values.email.trim();
  const trimmedMessage = values.message.trim();

  if (trimmedName.length < 2) {
    errors.name = 'Please enter your name.';
  }

  if (!trimmedEmail) {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_REGEX.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (values.topics.length === 0) {
    errors.topics = 'Please select at least one focus area.';
  }

  if (trimmedMessage.length < 12) {
    errors.message =
      'Please share a brief description of the challenge or idea (at least 12 characters).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateNewsletterEmail(email: string): {
  isValid: boolean;
  error?: string;
} {
  const trimmed = email.trim();
  if (!trimmed) {
    return { isValid: false, error: 'Please enter an email address.' };
  }
  if (!EMAIL_REGEX.test(trimmed)) {
    return { isValid: false, error: 'Please enter a valid email address.' };
  }
  return { isValid: true };
}

export function getNextCarouselIndex(
  currentIndex: number,
  direction: 'prev' | 'next',
  total: number
): number {
  if (total <= 0) return 0;
  if (direction === 'next') {
    return (currentIndex + 1) % total;
  }
  return (currentIndex - 1 + total) % total;
}

export function toggleTopicSelection(
  currentTopics: readonly string[],
  topic: string
): string[] {
  if (currentTopics.includes(topic)) {
    return currentTopics.filter((item) => item !== topic);
  }
  return [...currentTopics, topic];
}

export function toggleExpandedId(
  currentId: string | null,
  targetId: string
): string | null {
  return currentId === targetId ? null : targetId;
}
