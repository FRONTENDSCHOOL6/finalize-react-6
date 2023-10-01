import { useState } from 'react';
import Button from '@/components/Button';
import { CheckField } from '@/components/InputField';
import Modal from '@/components/join/Modal';
import {
  TermsOfServicePrivacy,
  TermsOfServiceUse,
} from '@/components/join/TermsOfService';
import { useEffect } from 'react';

export default function Termscheck({ setIsAgreed }) {
  const [isAllAccepted, setIsAllAccepted] = useState(false);
  const [isUseAccepted, setIsUseAccepted] = useState(false);
  const [isPrivacyAccepted, setIsPrivacyAccepted] = useState(false);

  // 전체 동의 클릭 -> 개별 항목 체크 =
  const handleAllChange = (e) => {
    const isChecked = e.target.checked;
    setIsAllAccepted(isChecked);
    setIsUseAccepted(isChecked);
    setIsPrivacyAccepted(isChecked);
  };

  // 개별 항목 클릭
  const handleIndividualChange = (setIndividualState) => (event) => {
    setIndividualState(event.target.checked);
  };

  useEffect(() => {
    if (!isUseAccepted || !isPrivacyAccepted) {
      setIsAllAccepted(false);
      setIsAgreed(false); // 약관 미동의 상태 반영
    } else {
      setIsAllAccepted(true);
      setIsAgreed(true); // 약관 동의 상태 반영
    }
  }, [isUseAccepted, isPrivacyAccepted]);

  useEffect(() => {
    if (isAllAccepted) {
      setIsUseAccepted(isAllAccepted);
      setIsPrivacyAccepted(isAllAccepted);
    }
  }, [isAllAccepted]);

  return (
    <>
      <div className="flex flex-col gap-2 my-3 w-full max-w-[400px]">
        <CheckField
          id="checkAll"
          name="checkAll"
          placeholder="전체 약관 동의"
          className="w-full max-w-[400px] px-5 py-4 bg-gray-200 rounded-md dark:bg-slate-800"
          onChange={handleAllChange}
          checked={isAllAccepted}
        />
        <div className="flex justify-between items-center pl-5">
          <CheckField
            id="checkUse"
            name="checkUse"
            placeholder="이용 약관 동의"
            className="pt-1"
            onChange={handleIndividualChange(setIsUseAccepted)}
            checked={isUseAccepted}
          />
          <Modal>
            <TermsOfServiceUse />
          </Modal>
        </div>
        <div className="flex justify-between items-center pl-5">
          <CheckField
            id="checkPrivacy"
            name="checkPrivacy"
            placeholder="개인정보 수집 및 이용 동의"
            onChange={handleIndividualChange(setIsPrivacyAccepted)}
            checked={isPrivacyAccepted}
          />
          <Modal>
            <TermsOfServicePrivacy />
          </Modal>
        </div>
      </div>
      <Button
        bgColor={!isAllAccepted ? 'bg-sand dark:text-slate-700' : 'bg-blue'}
      >
        가입하기
      </Button>
    </>
  );
}
