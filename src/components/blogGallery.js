// BlogGallery.js
import GenericGallery from './GenericGallery';
import TextCard from '../components/TextCard'; // This is a hypothetical component that you would create

const BlogGallery = () => {
  const dbRef = 'Blog'; // Reference to the 'Blog' node in your Firebase database
  const CardComponent = TextCard; // Use the TextCard component to render each item
  const headline = 'Blog Gallery';
  const tabOptions = ['All', 'Category1', 'Category2', 'Category3'];
  const itemsCountPerPage = 6;

  return (
    <GenericGallery
      dbRef={dbRef}
      CardComponent={CardComponent}
      headline={headline}
      tabOptions={tabOptions}
      itemsCountPerPage={itemsCountPerPage}
    />
  );
};

export default BlogGallery;