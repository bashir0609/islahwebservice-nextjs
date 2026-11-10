interface Props { state: 'idle' | 'pending' | 'success' | 'error'; message: string; }
export default function FormFeedback({ state, message }: Props) {
  return <div className={`form-feedback ${state}`} role={state === 'error' ? 'alert' : 'status'} aria-live={state === 'error' ? 'assertive' : 'polite'} aria-atomic="true">{message}</div>;
}
