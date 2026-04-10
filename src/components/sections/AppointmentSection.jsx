import { useMemo, useState } from 'react'
import SectionHeading from '../ui/SectionHeading'
import GlassPanel from '../ui/GlassPanel'
import { services } from '../../data/siteData'
import { useRevealAnimations } from '../../hooks/useRevealAnimations'

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
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
        {label}
      </span>
      {children}
      {error ? <span className="mt-2 block text-sm text-[var(--color-highlight)]">{error}</span> : null}
    </label>
  )
}

function AppointmentSection() {
  const sectionRef = useRevealAnimations()
  const [formValues, setFormValues] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const serviceOptions = useMemo(
    () => services.map((item) => item.title).sort((left, right) => left.localeCompare(right)),
    [],
  )

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validateForm(formValues)

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setIsSubmitted(false)
      return
    }

    setErrors({})
    setIsSubmitted(true)
    setFormValues(initialForm)
  }

  return (
    <section
      ref={sectionRef}
      id="appointment"
      className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="reveal">
          <SectionHeading
            align="left"
            eyebrow="Appointment Concierge"
            title="Reserve a private consultation with a polished, conversion-focused booking flow."
            description="This frontend form is prepared for future API integration. For now, it provides premium validation, a refined success state, and a layout that clearly supports bookings."
          />

          <GlassPanel className="mt-8 space-y-6 p-6">
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
                  className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4 text-sm text-white/70"
                >
                  {item}
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>

        <GlassPanel className="reveal p-6 sm:p-8">
          <form className="space-y-5" noValidate onSubmit={handleSubmit}>
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Full Name" error={errors.fullName}>
                <input
                  className="w-full rounded-[1.15rem] border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none transition focus:border-[rgba(252,223,92,0.35)] focus:bg-white/[0.07]"
                  name="fullName"
                  placeholder="Your full name"
                  value={formValues.fullName}
                  onChange={handleChange}
                />
              </Field>

              <Field label="Phone Number" error={errors.phoneNumber}>
                <input
                  className="w-full rounded-[1.15rem] border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none transition focus:border-[rgba(252,223,92,0.35)] focus:bg-white/[0.07]"
                  name="phoneNumber"
                  placeholder="+91"
                  value={formValues.phoneNumber}
                  onChange={handleChange}
                />
              </Field>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Email Address" error={errors.emailAddress}>
                <input
                  className="w-full rounded-[1.15rem] border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none transition focus:border-[rgba(252,223,92,0.35)] focus:bg-white/[0.07]"
                  name="emailAddress"
                  placeholder="name@email.com"
                  value={formValues.emailAddress}
                  onChange={handleChange}
                />
              </Field>

              <Field label="Preferred Service" error={errors.preferredService}>
                <select
                  className="w-full rounded-[1.15rem] border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none transition focus:border-[rgba(252,223,92,0.35)] focus:bg-white/[0.07]"
                  name="preferredService"
                  value={formValues.preferredService}
                  onChange={handleChange}
                >
                  <option value="">Select a service</option>
                  {serviceOptions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Preferred Date" error={errors.preferredDate}>
                <input
                  className="w-full rounded-[1.15rem] border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none transition focus:border-[rgba(252,223,92,0.35)] focus:bg-white/[0.07]"
                  min={new Date().toISOString().split('T')[0]}
                  name="preferredDate"
                  type="date"
                  value={formValues.preferredDate}
                  onChange={handleChange}
                />
              </Field>

              <Field label="Preferred Time" error={errors.preferredTime}>
                <input
                  className="w-full rounded-[1.15rem] border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none transition focus:border-[rgba(252,223,92,0.35)] focus:bg-white/[0.07]"
                  name="preferredTime"
                  type="time"
                  value={formValues.preferredTime}
                  onChange={handleChange}
                />
              </Field>
            </div>

            <Field label="Message / Concern" error={errors.message}>
              <textarea
                className="min-h-36 w-full rounded-[1.15rem] border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none transition focus:border-[rgba(252,223,92,0.35)] focus:bg-white/[0.07]"
                name="message"
                placeholder="Tell us about your concerns or preferred outcomes."
                value={formValues.message}
                onChange={handleChange}
              />
            </Field>

            <div className="flex flex-col gap-4 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                className="button-shine inline-flex items-center justify-center rounded-full border border-[rgba(252,223,92,0.2)] bg-[var(--color-button)] px-6 py-3.5 text-sm font-semibold text-[#f5efcf] shadow-[0_18px_40px_rgba(143,135,67,0.32)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_48px_rgba(143,135,67,0.42)]"
                type="submit"
              >
                Request Appointment
              </button>
              <p className="text-sm text-white/50">
                Frontend-only for now. Ready for backend integration later.
              </p>
            </div>

            {isSubmitted ? (
              <div className="rounded-[1.2rem] border border-[rgba(252,223,92,0.18)] bg-[rgba(252,223,92,0.08)] p-4 text-sm text-[var(--color-heading)]">
                Your request has been captured. A premium confirmation experience
                can be connected to your backend or CRM next.
              </div>
            ) : null}
          </form>
        </GlassPanel>
      </div>
    </section>
  )
}

export default AppointmentSection
