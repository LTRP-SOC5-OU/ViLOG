export default { title: "organisms/BookAccordion" };

import BookAccordion from "./BookAccordion";

const props = {
  name: "コンピュータ・サイエンス",
  author: { name: "山田太郎" },
  createdAt: new Date(),
  updatedAt: new Date(),
  sections: [
    {
      name: "情報のデジタルコンテンツ化",
      topics: [
        {
          name: "リンゴに夢中のレッサーパンダ",
        },
        {
          name: "リンゴに夢中のレッサーパンダ",
        },
      ],
    },
    {
      name: null,
      topics: [
        {
          name: "リンゴに夢中のレッサーパンダ",
        },
      ],
    },
    {
      name: "デジタルとアナログの相違点",
      topics: [],
    },
  ],
};

export const Default = () => {
  return (
    <div>
      {[...Array(10)].map((_value, index) => (
        <BookAccordion key={index} {...props} />
      ))}
    </div>
  );
};
