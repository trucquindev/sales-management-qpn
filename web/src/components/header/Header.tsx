import { useNavigate } from '@/router';
import { Map } from 'lucide-react';

const Header = () => {
  const router = useNavigate();

  return (
    <div>
      <div>
        <div>
          <Map className="-w4 h-4" />
          Store Location: 48 Cao Thang,Q. Hai Chau, TP. Da Nang,
        </div>
        <div className="text-black" onClick={() => router('/ok/aaaa')}>
          <p>aaaa</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
