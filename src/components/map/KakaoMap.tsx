import { useState } from 'react';
import DaumPostCode from 'react-daum-postcode';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const KakaoMap = ({ fullAddress, setFullAddress, userUid }: any) => {
  const [isPostCodeVisible, setIsPostCodeVisible] = useState<boolean>(false);

  const handleComplete = async (data: any) => {
    let address = data.address;
    let extraAddress = '';

    const { addressType, bname, buildingName } = data;
    if (addressType === 'R') {
      if (bname !== '') {
        extraAddress += bname;
      }
      if (buildingName !== '') {
        extraAddress += `${extraAddress !== '' ? ', ' : ''}${buildingName}`;
      }
      address += `${extraAddress !== '' ? ` (${extraAddress})` : ''}`;
    }

    setFullAddress(address);
    setIsPostCodeVisible(false);

    try {
      const addressRef = doc(db, "user", userUid);
      await updateDoc(addressRef, {
        address: address,
      });
      console.log("주소가 업데이트되었습니다.");
    } catch (error) {
      console.error("주소 업데이트 실패:", error);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <Label
          htmlFor="user_address"
          className='flex justify-between'
        >
          주소
          {fullAddress ? (
            <p
              onClick={() => setIsPostCodeVisible(true)}>
              주소 변경
            </p>
          ) : (
            <p onClick={() => setIsPostCodeVisible(true)} >
              주소 검색
            </p>
          )}
        </Label>
        <Input
          id="user_address"
          type="text"
          value={fullAddress}
          readOnly
        />

        {isPostCodeVisible && (
          <DaumPostCode
            onComplete={handleComplete}
            className="post-code"
            autoClose={false}
          />
        )}
      </div>
    </div>
  );
};

export default KakaoMap;

