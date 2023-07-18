import treeline from './banner-image-720.webp'
import campfire from './around-the-campfire.webp'

export const images = {
    bgTop: {
        img: {
            src: treeline,
            alt: "Pine trees silhouetted against a starry sky."
        },
        sources: {
            portrait:[
                {
                    media: '(orientation:portrait)',
                    srcSet: `${treeline} 850w, ${treeline} 1080w`,
                    sizes: '(max-width: 500px) 800px, 1350px'
                },
            ],
            landscape: [
                {
                    media: '(max-width: 899px)',
                    srcSet: `${treeline} 800w, ${treeline} 1350w`,
                    sizes: '(max-width: 500px) 800px, 1350px'
                },
                {
                    media: '(min-width:0px)',
                    srcSet: `${treeline} 1080w, ${treeline} 2238w`,
                    sizes: '(max-width: 1920px) 1080w, 2238w'
                }
            ],
            thumb: [
            ]
        }
    },
    bgBottom: {
        img: {
            src: campfire,
            alt: "Elderly man and young woman sitting around the campfire at night."
        },
        sources: {
            portrait:[
                {
                    media: '(orientation:portrait)',
                    srcSet: `${campfire} 850w, ${campfire} 1080w`,
                    sizes: '(max-width: 500px) 800px, 1350px'
                },
            ],
            landscape: [
                {
                    media: '(max-width: 899px)',
                    srcSet: `${campfire} 800w, ${campfire} 1350w`,
                    sizes: '(max-width: 500px) 800px, 1350px'
                },
                {
                    media: '(min-width:0px)',
                    srcSet: `${campfire} 1080w, ${campfire} 2238w`,
                    sizes: '(max-width: 1920px) 1080w, 2238w'
                }
            ],
            thumb: [
            ]
        }
    }
}