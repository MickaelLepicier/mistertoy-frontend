import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export function ToyPreview({ toy }) {
    const {t} = useTranslation()

    const [isImgLoading, setImgLoading] = useState(true)

    function handleImageLoad() {
        setImgLoading(false)
    }
    return (
        <Link to={`/toy/${toy._id}`}>
            <article className="toy-preview">
                <h1 className="toy-name">{toy.name}</h1>
                {isImgLoading && <div className="skeleton-loader"></div>}
                <div className="img-container">
                    <img
                        src={`https://robohash.org/${toy.name}?set=set4`}
                        alt={toy.name}
                        onLoad={handleImageLoad}
                        style={{ display: isImgLoading ? 'none' : 'block' }}
                    />
                </div>
                <h1>{t('price')}: ${toy.price}</h1>
                <h1 className={toy.inStock ? 'green' : 'red'}>
                    {toy.inStock ? t('in_stock') : t('not_in_stock')}
                </h1>
            </article>
        </Link>
    )
}
