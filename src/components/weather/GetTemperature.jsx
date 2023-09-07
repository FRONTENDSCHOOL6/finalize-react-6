export default function GetTemperature() {
  return (
    <table className="border-2 w-6/12 text-center text-xl">
      <thead className="border-2">
        <tr>
          <th className="border-2 h-[50px]"></th>
          <th className="border-2">오늘</th>
          <th className="border-2">내일</th>
          <th className="border-2">모레</th>
          <th className="border-2">글피</th>
        </tr>
      </thead>
      <tbody className="border-2">
        <tr>
          <th className="border-2 h-[50px]">
            최<span className="text-red-600">고</span> 기온
          </th>
          <td className="border-2">30&deg;C</td>
          <td className="border-2">29&deg;C</td>
          <td className="border-2">28&deg;C</td>
          <td className="border-2">27&deg;C</td>
        </tr>
        <tr>
          <th className="border-2 h-[50px]">
            최<span className="text-sky-600">저</span> 기온
          </th>
          <td className="border-2">20&deg;C</td>
          <td className="border-2">21&deg;C</td>
          <td className="border-2">22&deg;C</td>
          <td className="border-2">23&deg;C</td>
        </tr>
      </tbody>
    </table>
  );
}
