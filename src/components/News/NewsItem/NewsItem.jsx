import './NewsItem.scss';
import PropTypes from 'prop-types';

export default function NewsItem({item}) {
  return (
    <article id={item.id} className="body__article article">
      <img src={item.image} alt="" className="article__img" />
      <div className="article__body">
        <h2 className="article__title">{item.title}</h2>
        <div className="article__content">{item.content}</div>
      </div>
    </article>
  )
} 

NewsItem.propTypes = {
  item: PropTypes.object.isRequired
}