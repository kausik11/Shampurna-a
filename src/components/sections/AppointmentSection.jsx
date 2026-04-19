import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { FiLoader } from 'react-icons/fi'
import SectionHeading from '../ui/SectionHeading'
import GlassPanel from '../ui/GlassPanel'
import { useRevealAnimations } from '../../hooks/useRevealAnimations'
import useServices from '../../hooks/useServices'
import { submitCallbackRequest } from '../../lib/servicesApi'
import { isApiError } from '../../lib/apiClient'

const initialForm = {
  fullName: '',
  phoneNumber: '',
  emailAddress: '',
  preferredService: '',
  preferredDate: '',
  preferredTime: '',
  message: '',
}

function validateForm(values) {
  const errors = {}

  if (!values.fullName.trim()) {
    errors.fullName = 'Please enter your full name.'
  }

  if (!/^\+?[0-9\s-]{10,15}$/.test(values.phoneNumber.trim())) {
    errors.phoneNumber = 'Enter a valid phone number.'
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.emailAddress.trim())) {
    errors.emailAddress = 'Enter a valid email address.'
  }

  if (!values.preferredService) {
    errors.preferredService = 'Please select a service.'
  }

  if (!values.preferredDate) {
    errors.preferredDate = 'Select a preferred date.'
  }

  if (!values.preferredTime) {
    errors.preferredTime = 'Select a preferred time.'
  }

  return errors
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45 sm:text-xs sm:tracking-[0.22em]">
        {label}
      </span>
      {children}
      {error ? <span className="mt-2 block text-sm text-[var(--color-highlight)]">{error}</span> : null}
    </label>
  )
}

function AppointmentSuccessPopup({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (typeof document === 'undefined') {
    return null
  }

  return createPortal(
    <div
      className={`fixed inset-0 z-[120] flex items-end justify-center px-4 py-4 transition duration-300 sm:items-center sm:px-6 ${
        isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
      aria-hidden={!isOpen}
    >
      <button
        className="absolute inset-0 h-full w-full bg-[rgba(18,3,11,0.76)] backdrop-blur-[12px]"
        type="button"
        aria-label="Close success popup"
        tabIndex={isOpen ? 0 : -1}
        onClick={onClose}
      />

      <div
        className={`relative w-full max-w-lg transform transition duration-300 ${
          isOpen ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-6 scale-[0.98] opacity-0'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="appointment-success-title"
      >
        <div className="pointer-events-none absolute -inset-3 rounded-[1.5rem] bg-[radial-gradient(circle_at_18%_16%,rgba(245,73,145,0.3),transparent_34%),radial-gradient(circle_at_84%_10%,rgba(235,200,0,0.22),transparent_30%)] blur-2xl" />

        <div className="relative overflow-hidden rounded-[1rem] border border-white/10 bg-[linear-gradient(180deg,rgba(74,17,56,0.96),rgba(32,6,22,0.98))] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.34)] sm:p-8">
          <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(252,223,92,0.18),transparent)]" />

          <div className="relative">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-gold)] sm:text-xs sm:tracking-[0.28em]">
              Request Confirmed
            </p>
            <h3
              id="appointment-success-title"
              className="mt-3 text-wrap font-display text-3xl leading-tight text-[var(--color-heading)] sm:text-4xl"
            >
              Your appointment request has been received.
            </h3>
            <p className="mt-4 text-sm leading-7 text-white/68 sm:text-base">
              Thank you for reaching out to Shampurna Aesthetic. Our team will review your request and contact you soon to confirm the next step.
            </p>

            <div className="mt-6 rounded-[0.9rem] border border-[rgba(252,223,92,0.16)] bg-[rgba(255,255,255,0.04)] p-4 text-sm leading-7 text-white/72">
              A confirmation email has also been sent to the address you entered.
            </div>

            <div className="mt-6 flex justify-end">
              <button
                className="button-shine inline-flex min-h-11 items-center justify-center rounded-[0.5rem] border border-[rgba(252,223,92,0.2)] bg-[var(--color-button)] px-5 py-3 text-sm font-semibold text-[#f5efcf] shadow-[0_18px_40px_rgba(143,135,67,0.32)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_48px_rgba(143,135,67,0.42)]"
                type="button"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}

function AppointmentSection() {
  const sectionRef = useRevealAnimations()
  const { serviceOptions, isLoading } = useServices()
  const [formValues, setFormValues] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const closeSuccessPopup = useCallback(() => {
    setIsSubmitted(false)
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
    setIsSubmitted(false)
    setSubmitError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validateForm(formValues)

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setIsSubmitted(false)
      return
    }

    setErrors({})
    setSubmitError('')
    setIsSubmitting(true)

    try {
      await submitCallbackRequest({
        fullName: formValues.fullName.trim(),
        phoneNumber: formValues.phoneNumber.trim(),
        email: formValues.emailAddress.trim(),
        preferredService: formValues.preferredService,
        preferredDate: formValues.preferredDate,
        preferredTime: formValues.preferredTime,
        description: formValues.message.trim(),
      })

      setIsSubmitted(true)
      setFormValues(initialForm)
    } catch (error) {
      setIsSubmitted(false)

      if (isApiError(error)) {
        setSubmitError(
          error.response?.data?.message ||
            'Unable to submit your request right now. Please try again in a moment.',
        )
      } else {
        setSubmitError('Unable to submit your request right now. Please try again in a moment.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      ref={sectionRef}
      id="appointment"
      className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 xl:py-28"
    >
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] xl:gap-10">
        <div className="reveal">
          <SectionHeading
            align="left"
            eyebrow="Appointment Concierge"
            title="Reserve a private consultation with a polished, conversion-focused booking flow."
            description="Consultation requests are submitted directly to the clinic callback system, with a refined form flow designed to feel private, polished, and effortless."
          />

          <GlassPanel className="mt-8 space-y-6 p-5 sm:p-6">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-gold)]">
                Concierge Promise
              </p>
              <p className="mt-4 text-sm leading-7 text-white/65">
                Consultation requests are designed to feel private, considered,
                and easy to complete. The interface supports strong conversion
                without feeling aggressive.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                'Priority callback window',
                'Private clinic guidance',
                'Service-led pre-visit notes',
                'Luxury hospitality experience',
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[1rem] border border-white/10 bg-white/[0.04] p-4 text-sm text-white/70 sm:rounded-[1.25rem]"
                >
                  {item}
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>

        <GlassPanel className="reveal p-3.5 sm:p-6 lg:p-8">
          <form className="space-y-5" noValidate onSubmit={handleSubmit}>
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Full Name" error={errors.fullName}>
                <input
                  className="min-h-11 w-full rounded-[1rem] border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none transition focus:border-[rgba(252,223,92,0.35)] focus:bg-white/[0.07] sm:rounded-[1.15rem]"
                  name="fullName"
                  placeholder="Your full name"
                  value={formValues.fullName}
                  onChange={handleChange}
                />
              </Field>

              <Field label="Phone Number" error={errors.phoneNumber}>
                <input
                  className="min-h-11 w-full rounded-[1rem] border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none transition focus:border-[rgba(252,223,92,0.35)] focus:bg-white/[0.07] sm:rounded-[1.15rem]"
                  name="phoneNumber"
                  placeholder="+91"
                  type="tel"
                  value={formValues.phoneNumber}
                  onChange={handleChange}
                />
              </Field>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Email Address" error={errors.emailAddress}>
                <input
                  className="min-h-11 w-full rounded-[1rem] border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none transition focus:border-[rgba(252,223,92,0.35)] focus:bg-white/[0.07] sm:rounded-[1.15rem]"
                  name="emailAddress"
                  placeholder="name@email.com"
                  type="email"
                  value={formValues.emailAddress}
                  onChange={handleChange}
                />
              </Field>

              <Field label="Preferred Service" error={errors.preferredService}>
                <select
                  className="min-h-11 w-full rounded-[1rem] border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none transition focus:border-[rgba(252,223,92,0.35)] focus:bg-white/[0.07] sm:rounded-[1.15rem]"
                  name="preferredService"
                  value={formValues.preferredService}
                  onChange={handleChange}
                >
                  <option value="">{isLoading ? 'Loading services...' : 'Select a service'}</option>
                  {serviceOptions.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
                {isLoading ? (
                  <span className="mt-2 inline-flex items-center gap-2 text-xs text-white/45">
                    <FiLoader className="h-3.5 w-3.5 animate-spin text-[var(--color-gold)]" aria-hidden="true" />
                    Updating service list
                  </span>
                ) : null}
              </Field>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Preferred Date" error={errors.preferredDate}>
                <input
                  className="min-h-11 w-full rounded-[1rem] border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none transition focus:border-[rgba(252,223,92,0.35)] focus:bg-white/[0.07] sm:rounded-[1.15rem]"
                  min={new Date().toISOString().split('T')[0]}
                  name="preferredDate"
                  type="date"
                  value={formValues.preferredDate}
                  onChange={handleChange}
                />
              </Field>

              <Field label="Preferred Time" error={errors.preferredTime}>
                <input
                  className="min-h-11 w-full rounded-[1rem] border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none transition focus:border-[rgba(252,223,92,0.35)] focus:bg-white/[0.07] sm:rounded-[1.15rem]"
                  name="preferredTime"
                  type="time"
                  value={formValues.preferredTime}
                  onChange={handleChange}
                />
              </Field>
            </div>

            <Field label="Message / Concern" error={errors.message}>
              <textarea
                className="min-h-32 w-full rounded-[1rem] border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none transition focus:border-[rgba(252,223,92,0.35)] focus:bg-white/[0.07] sm:min-h-36 sm:rounded-[1.15rem]"
                name="message"
                placeholder="Tell us about your concerns or preferred outcomes."
                value={formValues.message}
                onChange={handleChange}
              />
            </Field>

            <div className="flex flex-col gap-4 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                className="button-shine inline-flex min-h-11 items-center justify-center rounded-full border border-[rgba(252,223,92,0.2)] bg-[var(--color-button)] px-5 py-3 text-center text-sm font-semibold text-[#f5efcf] shadow-[0_18px_40px_rgba(143,135,67,0.32)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_48px_rgba(143,135,67,0.42)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 sm:px-6 sm:py-3.5"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? 'Submitting Request...' : 'Request Appointment'}
              </button>
              <p className="text-sm text-white/50">
                Requests are sent directly to the clinic callback endpoint.
              </p>
            </div>

            {submitError ? (
              <div className="rounded-[1.2rem] border border-[rgba(245,73,145,0.22)] bg-[rgba(245,73,145,0.1)] p-4 text-sm text-[var(--color-heading)]">
                {submitError}
              </div>
            ) : null}

          </form>
        </GlassPanel>
      </div>

      <AppointmentSuccessPopup isOpen={isSubmitted} onClose={closeSuccessPopup} />
    </section>
  )
}

export default AppointmentSection
