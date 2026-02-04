
import { MenuService } from '@/services/menu.service'
import MenuManager from './MenuManager'

export default async function MenusPage() {
    const headerMenus = await MenuService.getMenus('HEADER')
    const footerMenus = await MenuService.getMenus('FOOTER')

    return <MenuManager initialHeaderMenus={headerMenus} initialFooterMenus={footerMenus} />
}
