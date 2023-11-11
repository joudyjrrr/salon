export interface SetVersionType {
  id?: string;
  title: string;
  body: string;
  iosVersionNumber: number;
  iosVersionName: string;
  androidVersionNumber: number;
  androidVersionName: string;
  androidUrl: string;
  iosUrl: string;
  isRequired: boolean;
  appType: number;
}
