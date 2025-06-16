import Image from 'next/image';
import React from 'react'
function getInitials(name: string): string {
    return name
        .split(' ')
        .map(word => word[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
}

const Avatar = ({ author }: { author: { avatar: string, name: string } }) => {
    return (
        <>
            {author.avatar?.startsWith("from") ? (
                <div className={`w-9 h-9 bg-gradient-to-br ${author.avatar} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white text-xs font-semibold">{getInitials(author.name)}</span>
                </div>
            ) : (
                <Image
                    src={author.avatar}
                    alt={author.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                    layout="fixed"
                />
            )}
        </>
    )
}

export default Avatar