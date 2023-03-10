'use client';

import Emoji from "a11y-react-emoji/lib/Emoji";
import { useEffect, useState } from "react";
export default function EmojiRandomizer({ isHuman }) {
	const humanEmojis = ["ð§ðŧ", "ð§ðŧ", "ðĶðž", "ðĐð―", "ð§ðŧ", "ðĐðžâðĶą", "ð§ðŋâðĶą", "ðąðŧ", "ðąðžââïļ", "ðąðūââïļ", "ð§ðžâðĶē", "ð§ðŧ", "ðīðŧ"]
	const robotEmoji = "ðĪ"

	const [index, setIndex] = useState(0);

	useEffect(() => {
		setIndex(Math.floor(Math.random() * humanEmojis.length))
	}, []);

	if (isHuman) {
		return <Emoji label="human" symbol={humanEmojis[index]} />
	}
	return <Emoji label="robot" symbol={robotEmoji} />
}