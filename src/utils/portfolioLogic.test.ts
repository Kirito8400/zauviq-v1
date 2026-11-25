import test from 'node:test';
import assert from 'node:assert/strict';
import { SOLUTIONS } from '../data/zauviqData';
import {
  filterSolutions,
  validateDialogueForm,
  validateNewsletterEmail,
  getNextCarouselIndex,
  toggleTopicSelection,
  toggleExpandedId,
} from './portfolioLogic';

test('filterSolutions returns all solutions when All is selected', () => {
  const result = filterSolutions(SOLUTIONS, 'All');
  assert.equal(result.length, SOLUTIONS.length);
});

test('filterSolutions filters strictly by category', () => {
  const healthcare = filterSolutions(SOLUTIONS, 'Healthcare');
  assert.equal(healthcare.length, 1);
  assert.equal(healthcare[0].id, 'mila-care');

  const operations = filterSolutions(SOLUTIONS, 'Operations');
  assert.equal(operations.length, 1);
  assert.equal(operations[0].id, 'kora-flow');
});

test('validateDialogueForm catches missing and malformed required fields', () => {
  const invalid = validateDialogueForm({
    name: 'A',
    organization: '',
    email: 'not-an-email',
    topics: [],
    message: 'Short',
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.topics);
  assert.ok(invalid.errors.message);
});

test('validateDialogueForm accepts valid input with optional organization omitted', () => {
  const valid = validateDialogueForm({
    name: 'Maya Patel',
    organization: '',
    email: 'maya@localdepot.org',
    topics: ['Field Research Partnership'],
    message: 'We are looking to simplify shift handoffs across three regional depots.',
  });
  assert.equal(valid.isValid, true);
  assert.deepEqual(valid.errors, {});
});

test('validateNewsletterEmail validates email structure accurately', () => {
  assert.equal(validateNewsletterEmail('').isValid, false);
  assert.equal(validateNewsletterEmail('invalid@').isValid, false);
  assert.equal(validateNewsletterEmail('research@zauviq.com').isValid, true);
});

test('getNextCarouselIndex wraps cleanly in both directions', () => {
  assert.equal(getNextCarouselIndex(0, 'next', 4), 1);
  assert.equal(getNextCarouselIndex(3, 'next', 4), 0);
  assert.equal(getNextCarouselIndex(0, 'prev', 4), 3);
  assert.equal(getNextCarouselIndex(2, 'prev', 4), 1);
  assert.equal(getNextCarouselIndex(0, 'next', 0), 0);
});

test('toggleTopicSelection adds and removes topics without mutating input', () => {
  const initial = ['Community Initiative'];
  const added = toggleTopicSelection(initial, 'Field Research Partnership');
  assert.deepEqual(added, ['Community Initiative', 'Field Research Partnership']);
  assert.deepEqual(initial, ['Community Initiative']);

  const removed = toggleTopicSelection(added, 'Community Initiative');
  assert.deepEqual(removed, ['Field Research Partnership']);
});

test('toggleExpandedId toggles active accordion item cleanly', () => {
  assert.equal(toggleExpandedId(null, 'faq-1'), 'faq-1');
  assert.equal(toggleExpandedId('faq-1', 'faq-1'), null);
  assert.equal(toggleExpandedId('faq-1', 'faq-2'), 'faq-2');
});
