import type { EnquiryInput, EnquiryKind } from './enquiries';

export interface IntegrationContext {
  kind: EnquiryKind;
  enquiry: Readonly<EnquiryInput>;
  correlationId: string;
}
export interface MockResult {
  mode: 'mock';
  performed: false;
}
export interface CrmAdapter { recordEnquiry(context: IntegrationContext): Promise<MockResult> }
export interface NotificationAdapter { notifyTeam(context: IntegrationContext): Promise<MockResult> }
// This boundary only assesses a future handoff. It cannot enroll contacts or send messages.
export interface SmartleadAdapter { assessHandoff(context: IntegrationContext): Promise<MockResult> }
const noOperation = async (): Promise<MockResult> => ({ mode: 'mock', performed: false });
export const mockCrm: CrmAdapter = Object.freeze({ recordEnquiry: noOperation });
export const mockNotification: NotificationAdapter = Object.freeze({ notifyTeam: noOperation });
export const mockSmartlead: SmartleadAdapter = Object.freeze({ assessHandoff: noOperation });
