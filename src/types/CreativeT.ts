export default interface CreativeT {
  id: string;
  createdBy?: { firstName: string; lastName: string };
  contributors: [{ id: string; firstName: string; lastName: string }];
  title: string;
  description?: string;
  formats: [];
  content?: string;
  enabled: boolean;
  index?: number;
  creativesLength?: number;
  bold?: boolean;
  style?: {};
  setToBold?: any;
}
