import React from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
interface PostcodeProps {
  userUid?: string;
  setFullAddress: (address: string) => void;
  fullAddress: string;
}

const Postcode: React.FC<PostcodeProps> = ({
  fullAddress,
  setFullAddress,
}) => {
  const scriptUrl =
    'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
  const open = useDaumPostcodePopup(scriptUrl);

  const handleComplete = async (data: any) => {
    let newAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      newAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setFullAddress(newAddress);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <div className="flex items-center">
      <Input
        type="text"
        value={fullAddress}
        readOnly
        placeholder="주소를 선택하세요"
        className="w-full"
      />
      <Button onClick={handleClick} className="ml-4" type="button">
        {fullAddress ? '주소 변경' : '주소 검색'}
      </Button>
    </div>
  );
};

export default Postcode;
