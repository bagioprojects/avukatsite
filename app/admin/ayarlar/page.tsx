
import { SettingsService } from '@/services/settings.service'
import SettingsForm from './SettingsForm'

export default async function SettingsPage() {
    const settings = await SettingsService.getSettings()

    return <SettingsForm initialData={settings} />
}
