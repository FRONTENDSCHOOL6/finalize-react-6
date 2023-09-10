import PropTypes from 'prop-types';

export default function MainTag({ data, onTagClick }) {
  const tags = data.map((item) => item.tag);

  // Count tag occurrences
  const tagCounts = tags.reduce((counts, tag) => {
    if (!counts[tag]) {
      counts[tag] = 0;
    }
    counts[tag]++;
    return counts;
  }, {});

  // 객체를 배열로 변환[tag, count]
  const sortedTag = Object.entries(tagCounts).slice(0, 5);
  sortedTag.sort((a, b) => b[1] - a[1]);
  const sortedTags = sortedTag.map((pair) => pair[0]);

  return (
    <>
      <ul className="flex flex-row justify-center items-center gap-2 pb-3">
        인기태그 :
        {sortedTags.map((tag) => {
          return (
            <li
              key={tag}
              className="cursor-pointer"
              onClick={() => onTagClick(tag)}
            >
              {tag}
            </li>
          );
        })}
        <li onClick={() => onTagClick(null)} className="cursor-pointer">
          / All
        </li>
      </ul>
    </>
  );
}

MainTag.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onTagClick: PropTypes.func,
};
