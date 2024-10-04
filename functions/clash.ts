const defaultTplUrl = 'https://github.com/eric-gitta-moore/sub-diversion-rules/raw/main/src/meta/server/assets/base.yaml'

export const onRequest: PagesFunction = async (context) => {
    const { params, env, request } = context
    const tplUrl = env['TPL_URL'] || defaultTplUrl
    let tpl = ''
    try {
        tpl = await fetch(tplUrl).then(e => e.text())
    } catch (e) {
        console.warn('获取远程配置失败', e)
    }
    const { searchParams } = new URL(request.url)
    const url: string = searchParams.get('url') || "";
    const resp = tpl.replace(`http://test.com`, decodeURIComponent(url));

    return new Response(resp);
};

