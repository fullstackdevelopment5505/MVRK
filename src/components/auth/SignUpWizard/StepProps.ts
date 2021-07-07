import { Step1Form } from './Step1'
import { Step2Form } from './Step2'

export type StepData = Partial<Step1Form & Step2Form>

export interface StepProps {
  formValues: StepData
  onNextStep: (data: StepData) => void
}
