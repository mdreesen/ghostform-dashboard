function openUserMap(lat, lng) {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    if (isIOS) {
        // Redirect to Apple Maps
        window.location.href = `maps://://apple.com{lat},${lng}`;
    } else {
        // Redirect to Google Maps
        window.location.href = `https://google.com{lat},${lng}`;
    }
}