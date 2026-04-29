async function test() {
    try {
        // 先ほどのエラーが出ていたAPIエンドポイント
        const url1 = "https://2sznhxhcd8.execute-api.ap-southeast-2.amazonaws.com/dev/lp/settings/01KQ6MW114KNVE53QHTSE2TFTJ";
        const res1 = await fetch(url1);
        const text1 = await res1.text();
        console.log("Settings API (Correct ID):", res1.status, text1);

        // 間違ったIDでのテスト
        const url2 = "https://2sznhxhcd8.execute-api.ap-southeast-2.amazonaws.com/dev/lp/settings/01KQ6MW5F8RHJ8BVW1V14HG5MB";
        const res2 = await fetch(url2);
        const text2 = await res2.text();
        console.log("Settings API (Wrong ID):", res2.status, text2);

    } catch (e) {
        console.error(e);
    }
}
test();
