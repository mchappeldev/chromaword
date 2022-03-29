import supabase from '../utils/supabase';

export async function post(event) {
    const ip = event.clientAddress;
    const body = await event.request.json();
    await supabase
        .from('BoardsComplete')
        .insert([
            { ipAddress: ip, deviceId: body.deviceId, userId: body.userId },
        ]);
    return {
        body: 'temp'
    };
}