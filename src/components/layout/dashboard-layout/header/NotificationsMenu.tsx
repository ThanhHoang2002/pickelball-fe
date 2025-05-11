import { Bell } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface Notification {
  id: string;
  icon: string;
  title: string;
  description: string;
  time: string;
  link: string;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    icon: '🎯',
    title: 'Khóa học mới',
    description: 'Digital Marketing từ A-Z 2024',
    time: '10 phút trước',
    link: '/courses/1'
  },
  {
    id: '2',
    icon: '📊',
    title: 'Cập nhật khóa học',
    description: 'Chiến lược Marketing TikTok mới nhất',
    time: '30 phút trước',
    link: '/courses/2'
  },
  {
    id: '3',
    icon: '💬',
    title: 'Bình luận mới',
    description: 'Trong khóa học Facebook Marketing',
    time: '1 giờ trước',
    link: '/courses/2/lessons/1'
  },
  {
    id: '4',
    icon: '⭐',
    title: 'Đánh giá mới',
    description: '5 sao cho khóa học Google Ads',
    time: '2 giờ trước',
    link: '/courses/3/reviews'
  },
  {
    id: '5',
    icon: '📱',
    title: 'Tài liệu mới',
    description: 'Hướng dẫn SEO cho người mới bắt đầu',
    time: '3 giờ trước',
    link: '/courses/4/materials'
  }
];

const NotificationsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const notifications = MOCK_NOTIFICATIONS;
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
          <Bell className="h-4 w-4" />
          <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full border-2 border-card bg-primary"></span>
          <span className="sr-only">Thông báo</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="border-b border-border p-3">
          <div className="font-medium text-foreground">Thông báo</div>
        </div>
        <div className="max-h-[calc(100vh-12rem)] overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="block cursor-pointer border-b border-border px-4 py-3 last:border-0 hover:bg-muted"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <div className="mb-1 flex items-start gap-2">
                <span className="text-base">{notification.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{notification.title}</p>
                  <p className="text-sm text-muted-foreground">{notification.description}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{notification.time}</p>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsMenu; 