import pingMapIcon from '@/assets/ic-mapping.png';
import phone from '@/assets/ic-phone.png';
import email from '@/assets/ic-email.png';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function Contact() {
  const INFO_CONTACT = [
    {
      id: 1,
      icon: pingMapIcon,
      title: '2715 Ash Dr. San Jose, South Dakota 83475',
    },
    {
      id: 2,
      icon: email,
      title: 'Proxy@gmail.com Help.proxy@gmail.com',
    },
    {
      id: 3,
      icon: phone,
      title: '(219) 555-0114 - (164) 333-0487',
    },
  ];

  return (
    <div className='flex gap-10 p-10 justify-center'>
      <div className="border w-80 space-y-14 p-4">
        {INFO_CONTACT.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-center flex-col space-x-4"
          >
            <img src={item.icon} alt={item.title} className="w-6 h-6" />
            <p className="text-center">{item.title}</p>
            <hr />
          </div>
        ))}
      </div>

      <div className='w-1/3'>
        <h2 className="text-2xl font-bold mb-4">Just Say Hello!</h2>
        <form className="space-y-4">
          <Input type="text" placeholder="Your Name" />
          <Input type="email" placeholder="Your Email" />
          <Textarea placeholder="Message" rows={4} />
          <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
}
