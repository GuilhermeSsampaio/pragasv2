import Link from 'next/link';
// componente que renderiza o breadcrumb

const Breadcrumbs = ({ displayedTitle }) => {
  return (
    <nav className="home-section" aria-label="Breadcrumbs" style={{ marginTop: 120 }}>
      <ul className="breadcrumbs">
        <li className="breadcrumbs__item">
          <Link href="/home" className="breadcrumbs__link">
            <i className="fas fa-home" style={{ fontSize: '13px' }}></i>
          </Link>
          <i className="fas fa-chevron-right" style={{ fontSize: '10px' }}></i>
        </li>
        <li className="breadcrumbs__item">
          <span className="breadcrumbs__link">Sumário</span>
          <meta itemProp="position" content="1" />
          <i className="fas fa-chevron-right" style={{ fontSize: '10px' }}></i>
        </li>
        <li className="breadcrumbs__item breadcrumbs__item--active">
          <span className="breadcrumbs__link" itemProp="name">
            {displayedTitle}
          </span>
          <meta itemProp="position" content="2" />
        </li>
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
