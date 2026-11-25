import { useState, type FormEvent } from 'react';
import { ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';
import { DIALOGUE_TOPICS } from '../data/zauviqData';
import {
  validateDialogueForm,
  toggleTopicSelection,
  type DialogueFormValues,
  type DialogueValidationErrors,
} from '../utils/portfolioLogic';

interface DialogueSectionProps {
  preselectedTopic?: string | null;
}

const INITIAL_VALUES: DialogueFormValues = {
  name: '',
  organization: '',
  email: '',
  topics: [],
  message: '',
};

export function DialogueSection({ preselectedTopic }: DialogueSectionProps) {
  const [values, setValues] = useState<DialogueFormValues>(() => ({
    ...INITIAL_VALUES,
    topics: preselectedTopic ? [preselectedTopic] : [],
  }));
  const [errors, setErrors] = useState<DialogueValidationErrors>({});
  const [submittedRecord, setSubmittedRecord] = useState<DialogueFormValues | null>(null);

  const handleTopicToggle = (topic: string) => {
    setValues((prev) => ({
      ...prev,
      topics: toggleTopicSelection(prev.topics, topic),
    }));
    if (errors.topics) {
      setErrors((prev) => ({ ...prev, topics: undefined }));
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateDialogueForm(values);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setSubmittedRecord({
      ...values,
      name: values.name.trim(),
      organization: values.organization.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
    });
  };

  const handleReset = () => {
    setSubmittedRecord(null);
    setValues(INITIAL_VALUES);
    setErrors({});
  };

  return (
    <section
      id="dialogue"
      aria-labelledby="dialogue-heading"
      className="mx-auto max-w-[1380px] px-4 pt-16 pb-10 md:px-6 md:pt-24 md:pb-14"
    >
      {/* Editorial Lead Header on Cool Canvas */}
      <div className="grid grid-cols-1 gap-6 px-2 pb-10 lg:grid-cols-12 lg:items-end lg:px-8">
        <div className="lg:col-span-4">
          <p className="text-[14px] font-medium text-[#4E5760]">
            Start a dialogue
          </p>
        </div>
        <div className="lg:col-span-8">
          <h2
            id="dialogue-heading"
            className="font-[var(--font-display)] text-[clamp(1.9rem,3.4vw,3rem)] font-medium leading-[1.12] tracking-[-0.03em] text-[#0B0D0E] max-w-[740px]"
          >
            Every possibility begins with an honest conversation about a real problem.
          </h2>
        </div>
      </div>

      {/* Main White Architectural Inquiry Panel */}
      <div className="rounded-[28px] md:rounded-[36px] bg-white px-6 py-12 md:px-14 md:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Editorial Column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h3 className="font-[var(--font-display)] text-[clamp(1.5rem,2.5vw,2.25rem)] font-medium leading-[1.18] tracking-[-0.025em] text-[#0B0D0E]">
                Tell us what slows your people down.
              </h3>
              <p className="mt-5 text-[15px] leading-[1.68] text-[#4E5760] max-w-[42ch]">
                Whether you are navigating a recurring operational bottleneck, exploring early access to one of our platforms, or interested in collaborating on field research, our product researchers read every note personally.
              </p>
            </div>

            <div className="mt-10 border-t border-[#EEF2F5] pt-7 space-y-2 text-[14px] text-[#4E5760]">
              <p className="font-medium text-[#0B0D0E]">Direct research desk</p>
              <p>hello@zauviq.com</p>
              <p className="text-[13px] text-[#6C7680]">
                Typical response within two business days.
              </p>
            </div>
          </div>

          {/* Right Form or Confirmation Column */}
          <div className="lg:col-span-7">
            {submittedRecord ? (
              <div
                role="status"
                aria-live="polite"
                className="rounded-[22px] bg-[#F4F6F8] p-8 md:p-10"
              >
                <div className="flex items-center gap-3 text-[#0B0D0E]">
                  <CheckCircle2 className="w-6 h-6 text-[#1D4ED8] shrink-0" aria-hidden="true" />
                  <h4 className="font-[var(--font-display)] text-[22px] font-medium tracking-[-0.02em]">
                    Thank you, {submittedRecord.name}. Your note is with our team.
                  </h4>
                </div>
                <p className="mt-4 text-[15px] leading-[1.65] text-[#4E5760]">
                  We have logged your dialogue under{' '}
                  <span className="font-medium text-[#0B0D0E]">
                    {submittedRecord.topics.join(', ')}
                  </span>{' '}
                  and will reply to{' '}
                  <span className="font-medium text-[#0B0D0E]">{submittedRecord.email}</span>{' '}
                  after reviewing your context.
                </p>
                <div className="mt-6 rounded-[14px] bg-white p-5 border border-[#DCE2E6]">
                  <p className="text-[12px] font-medium text-[#6C7680]">Summary shared</p>
                  <p className="mt-2 text-[14px] leading-[1.6] text-[#0B0D0E]">
                    {submittedRecord.message}
                  </p>
                </div>
                <div className="mt-7">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#DCE2E6] bg-white px-5 py-2.5 text-[14px] font-medium text-[#0B0D0E] transition-colors hover:border-[#0B0D0E] cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" aria-hidden="true" />
                    <span>Send another note</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate aria-label="Start a dialogue with Zauviq" className="space-y-7">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="dialogue-name"
                      className="block text-[13px] font-medium text-[#0B0D0E]"
                    >
                      Your Name
                    </label>
                    <input
                      id="dialogue-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Elena Lindqvist"
                      value={values.name}
                      onChange={(e) => {
                        setValues((prev) => ({ ...prev, name: e.target.value }));
                        if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'dialogue-name-error' : undefined}
                      className={`mt-2 block w-full border-b bg-transparent py-2.5 text-[15px] text-[#0B0D0E] placeholder:text-[#9AA3AC] transition-colors ${
                        errors.name
                          ? 'border-[#DC2626]'
                          : 'border-[#DCE2E6] focus:border-[#0B0D0E]'
                      }`}
                    />
                    {errors.name && (
                      <p id="dialogue-name-error" className="mt-1.5 text-[13px] text-[#B91C1C]">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="dialogue-organization"
                      className="block text-[13px] font-medium text-[#0B0D0E]"
                    >
                      Organization or Community <span className="font-normal text-[#6C7680]">(Optional)</span>
                    </label>
                    <input
                      id="dialogue-organization"
                      name="organization"
                      type="text"
                      autoComplete="organization"
                      placeholder="Harborview Clinic"
                      value={values.organization}
                      onChange={(e) =>
                        setValues((prev) => ({ ...prev, organization: e.target.value }))
                      }
                      className="mt-2 block w-full border-b border-[#DCE2E6] bg-transparent py-2.5 text-[15px] text-[#0B0D0E] placeholder:text-[#9AA3AC] transition-colors focus:border-[#0B0D0E]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="dialogue-email"
                    className="block text-[13px] font-medium text-[#0B0D0E]"
                  >
                    Email Address
                  </label>
                  <input
                    id="dialogue-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="elena@organization.org"
                    value={values.email}
                    onChange={(e) => {
                      setValues((prev) => ({ ...prev, email: e.target.value }));
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'dialogue-email-error' : undefined}
                    className={`mt-2 block w-full border-b bg-transparent py-2.5 text-[15px] text-[#0B0D0E] placeholder:text-[#9AA3AC] transition-colors ${
                      errors.email
                        ? 'border-[#DC2626]'
                        : 'border-[#DCE2E6] focus:border-[#0B0D0E]'
                    }`}
                  />
                  {errors.email && (
                    <p id="dialogue-email-error" className="mt-1.5 text-[13px] text-[#B91C1C]">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Interactive Focus Area Selection Buttons */}
                <fieldset>
                  <legend className="text-[13px] font-medium text-[#0B0D0E]">
                    What would you like to explore together?
                  </legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {DIALOGUE_TOPICS.map((topic) => {
                      const isSelected = values.topics.includes(topic);
                      return (
                        <button
                          key={topic}
                          type="button"
                          aria-pressed={isSelected}
                          onClick={() => handleTopicToggle(topic)}
                          className={`min-h-[40px] rounded-full border px-4 py-2 text-[13px] font-medium transition-colors duration-150 whitespace-nowrap cursor-pointer ${
                            isSelected
                              ? 'border-[#0B0D0E] bg-[#0B0D0E] text-white'
                              : 'border-[#DCE2E6] bg-[#F4F6F8] text-[#4E5760] hover:border-[#0B0D0E] hover:text-[#0B0D0E]'
                          }`}
                        >
                          {topic}
                        </button>
                      );
                    })}
                  </div>
                  {errors.topics && (
                    <p className="mt-2 text-[13px] text-[#B91C1C]">{errors.topics}</p>
                  )}
                </fieldset>

                <div>
                  <label
                    htmlFor="dialogue-message"
                    className="block text-[13px] font-medium text-[#0B0D0E]"
                  >
                    Describe the real-world challenge or context
                  </label>
                  <textarea
                    id="dialogue-message"
                    name="message"
                    rows={4}
                    placeholder="Tell us about the everyday friction your team or community faces..."
                    value={values.message}
                    onChange={(e) => {
                      setValues((prev) => ({ ...prev, message: e.target.value }));
                      if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                    }}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'dialogue-message-error' : undefined}
                    className={`mt-2 block w-full resize-y rounded-[16px] border bg-[#F4F6F8] p-4 text-[15px] leading-[1.6] text-[#0B0D0E] placeholder:text-[#9AA3AC] transition-colors focus:bg-white ${
                      errors.message
                        ? 'border-[#DC2626]'
                        : 'border-[#DCE2E6] focus:border-[#0B0D0E]'
                    }`}
                  />
                  {errors.message && (
                    <p id="dialogue-message-error" className="mt-1.5 text-[13px] text-[#B91C1C]">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex min-h-[48px] items-center gap-2.5 rounded-full bg-[#0B0D0E] px-7 py-3 text-[15px] font-medium text-white transition-colors duration-200 hover:bg-[#1D4ED8] cursor-pointer whitespace-nowrap"
                  >
                    <span>Send Inquiry</span>
                    <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
