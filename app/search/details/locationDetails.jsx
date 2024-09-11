const LocationDetails = ({ data }) => {
    const renderDetail = (label, value) => {
      if (value) {
        return (
          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <div className="font-medium text-gray-900">{label}</div>
            <div className="text-gray-700 sm:col-span-2">{value}</div>
          </div>
        );
      }
      return null;
    };
  
    const renderBoundingBox = () => {
      if (data.bbox) {
        return (
          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Bounding Box</dt>
            <dd className="text-gray-700 sm:col-span-2">{data.bbox.lat1}, {data.bbox.lon1}, {data.bbox.lat2}, {data.bbox.lon2}</dd>
          </div>
        );
      }
      return null;
    };
  
    return (
      <div className="flow-root p-8 my-4">
        <dl className="-my-3 divide-y divide-gray-100 text-sm">
          {renderDetail("Country", data.country)}
          {renderDetail("State", data.state)}
          {renderDetail("City", data.city)}
          {renderDetail("Latitude", data.lat)}
          {renderDetail("Longitude", data.lon)}
          {renderBoundingBox()}
        </dl>
      </div>
    );
  };

  export {LocationDetails};