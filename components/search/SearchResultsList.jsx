import Link from 'next/link';
import { SearchResult } from './SearchResult';

export const SearchResultsList = ({ searchResults, handleResultClick }) => {
  return (
    <div className="results-list">
      {searchResults.map((result) => (
        <Link
          className="result-link"
          href={`/sumario?activeChapter=${result.chapterId}#capitulo_${result.subchapterId}`}
          key={result.subchapterId}
          passHref
        >
          <div onClick={() => handleResultClick(result.chapterId, result.subchapterId)}>
            <SearchResult result={result} />
          </div>
        </Link>
      ))}
    </div>
  );
};
