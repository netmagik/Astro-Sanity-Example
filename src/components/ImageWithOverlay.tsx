import { useQuery } from "@sanity/react-loader";
import { urlFor } from "../utils/image";

type ImageProps = {
    imageId: string; // Pass an ID or other image reference
};

// Utility to extract the asset ID from the compound reference
const extractAssetId = (imageId: string) => {
    const match = imageId.match(/^image-([^-]+)-/);
    return match ? match[1] : null;
};

export default function ImageWithOverlay({ imageId }: ImageProps) {
    const assetId = extractAssetId(imageId);

    console.log("Image ID:", imageId);
    console.log("Fetched Image Asset ID:", assetId);

    // Only proceed if the asset ID could be extracted
    if (!assetId) {
        return <div>Image ID format is incorrect</div>;
    }

    // New query to fetch the image data using the imageId
    const { data: image, encodeDataAttribute } = useQuery(
        `*[_type == "sanity.imageAsset" && @assetId == $imageId][0]`, // Fetch the image asset by its ID
        { assetId } // Pass the asset ID as a parameter
    );
    console.log('data:', image);

    if (!image) {
        return <div>Loading...</div>; // Handle loading state
    }

    return (
        <img
            data-sanity={encodeDataAttribute("image")}
            src={urlFor(image).url()} // Use the Sanity image URL builder
            alt="Image with Overlay"
            className="post__cover"
        />
    );
}