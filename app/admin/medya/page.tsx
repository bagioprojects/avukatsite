import { MediaService } from '@/services/media.service'
import MediaManager from './MediaManager'

export default async function MediaPage() {
    const media = await MediaService.getAllMedia()

    return <MediaManager initialMedia={media} />
}
