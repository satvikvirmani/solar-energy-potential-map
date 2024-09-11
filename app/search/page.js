import { SearchBox } from '@mapbox/search-js-react';

const MyComponent = () => {
  return (
    <div>
    <SearchBox
      accessToken='YOUR_MAPBOX_ACCESS_TOKEN'
      options={{
        language: 'en',
        country: 'US'
      }}
    />
    </div>
  )
}

export default MyComponent
