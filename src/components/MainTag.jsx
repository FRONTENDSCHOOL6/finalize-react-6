import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function MainTag({ data, onTagClick, setPage }) {
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

  const [selectedTag, setSelectedTag] = useState(null);

  return (
    <>
      <ul className="flex flex-row justify-center items-center gap-2 pb-3 absolute top-0 left-[calc(50%-150px)]">
        <li
          onClick={() => {
            onTagClick(null);
            setPage(1); // 페이지를 1로 설정
            setSelectedTag(null);
          }}
          className="cursor-pointer"
        >
          <motion.div
            className={`box ${selectedTag === null ? 'font-extrabold' : ''}`}
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            제주의 ⭐
          </motion.div>
        </li>
        {sortedTags.map((tag) => {
          return (
            <li
              key={tag}
              className="cursor-pointer"
              onClick={() => {
                onTagClick(tag);
                setPage(1); // 페이지를 1로 설정
                setSelectedTag(tag);
              }}
            >
              <motion.div
                className={`box ${selectedTag === tag ? 'font-extrabold' : ''}`}
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                {tag}
              </motion.div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

MainTag.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onTagClick: PropTypes.func,
  setPage: PropTypes.func.isRequired,
};
