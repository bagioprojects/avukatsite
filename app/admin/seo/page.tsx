
import { SettingsService } from '@/services/settings.service'
import SeoSettingsForm from './SeoSettingsForm'

export default async function SeoPage() {
    const settings = await SettingsService.getSettings()

    return <SeoSettingsForm initialSettings={settings} />
}
