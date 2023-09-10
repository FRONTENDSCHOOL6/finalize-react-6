import PropTypes from 'prop-types';

export default function MainTag({ data }) {
  console.log('MTdata:', data);

  const tags = data.map((item) => item.tag);

  // Count tag occurrences
  const tagCounts = tags.reduce((counts, tag) => {
    if (!counts[tag]) {
      counts[tag] = 0;
    }
    counts[tag]++;
    return counts;
  }, {});

  // Convert the object to an array of [tag, count] pairs
  const sortedTag = Object.entries(tagCounts).slice(0, 5);

  // Sort the array by count in descending order
  sortedTag.sort((a, b) => b[1] - a[1]);

  // Extract the tags from the sorted pairs
  const sortedTags = sortedTag.map((pair) => pair[0]);

  // Join the tags into a string, separated by spaces
  const popularTags = sortedTags.join(' ');

  console.log('sortedTag:', sortedTag);

  return <div>인기태그: {popularTags}</div>;
}

MainTag.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
