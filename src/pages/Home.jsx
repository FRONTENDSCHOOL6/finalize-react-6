import MainContent from '@/components/MainContent';
import MainSlide from '@/components/MainSlide';

export default function Home() {
  return (
    <>
      <section>
        <MainSlide src="/mainSlide1.jpg" alt="제주도 바다" />
      </section>

      <section className="flex grow gap-5 my-10 mx-10">
        <MainContent src="/jejuImage1.jpg" alt="메밀꽃밭" title="제주 메밀꽃" />
        <MainContent src="/jejuImage4.jpg" alt="돌담" title="제주 돌담" />
        <MainContent
          src="/jejuImage3.jpg"
          alt="한라봉 과수원"
          title="제주는 한라봉이면 충분하다고 할 수 있지 않을까?"
        />
      </section>
    </>
  );
}
