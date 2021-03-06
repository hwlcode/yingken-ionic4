export class PostAccessTokenRequest {
    phone: string;
    phoneCode: string;
}

export class PostAvatarRequest {
    id: string;
    avatar: string;
}

export class PostNameRequest {
    id: string;
    name: string;
}

export class PostSexRequest {
    id: string;
    sex: string;
}

export class PostBirthRequest {
    id: string;
    birth: string;
}

export class PostAddressRequest {
    userId: string;
    address: string;
    is_default: string;
}

export class PostProfile {
    userId: string;
    name: string;
    sex: string;
    phone: string;
    birth: string;
}

