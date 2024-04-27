import { TestBed } from '@angular/core/testing';

import { MessageAndNotificationService } from '../messageAndNotificationService/message-and-notification.service';

describe('MessageAndNotificationService', () => {
  let service: MessageAndNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageAndNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
