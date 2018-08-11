import { NotificationMessage } from '@cleanroad/core/models';

export interface ErrorNotificationMessage extends NotificationMessage {
    message: string;
    error?: Error;
}
