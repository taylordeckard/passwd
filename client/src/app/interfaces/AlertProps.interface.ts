import { AlertColor } from 'app/enums';

export interface AlertProps {
  show: boolean;
  msg: string;
  color: AlertColor;
}
