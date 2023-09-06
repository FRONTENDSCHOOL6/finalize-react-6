export default function SelectLocation() {
  return (
    <div className="h-[50px] leading-[50px]">
      <span className="w-[100px] inline-flex text-2xl">지역</span>
      <select name="location" className="mx-3">
        <option value="">- 선택 -</option>
        <option value="제주시">제주시</option>
        <option value="서귀포시">서귀포시</option>
      </select>
      <select>
        <option>- 선택 -</option>
        <option>OO동</option>
        <option>OO동</option>
      </select>
    </div>
  );
}
