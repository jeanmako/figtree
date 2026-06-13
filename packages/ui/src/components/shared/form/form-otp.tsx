"use client"

import {
  FormBase,
  FormControlProps,
} from "@figtree/ui/components/shared/form/form-base"
import { useFieldContext } from "@figtree/ui/hooks/form-hook"
import { OTPField, OTPFieldInput } from "@figtree/ui/components/input-otp"

const OTP_LENGTH = 6

const OTP_SLOT_KEYS = Array.from(
  { length: OTP_LENGTH },
  (_, i) => `otp-slot-${i}`
)

export function FormOTPField(props: FormControlProps) {
  const field = useFieldContext<string>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <FormBase {...props}>
      <OTPField
        id={props.id ?? field.name}
        name={field.name}
        length={OTP_LENGTH}
        size={"lg"}
        aria-invalid={isInvalid}
        disabled={props.disabled}
        value={field.state.value}
        onBlur={field.handleBlur}
        onValueChange={(e) => field.handleChange(e ?? "")}
        className={props.className}
      >
        {OTP_SLOT_KEYS.map((slotKey, index) => (
          <OTPFieldInput
            key={slotKey}
            aria-label={`Character ${index + 1} of ${OTP_LENGTH}`}
            placeholder="•"
          />
        ))}
      </OTPField>
    </FormBase>
  )
}
