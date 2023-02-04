import React from "react";
import MarkdownView from 'react-showdown';
import "./journal-entry.styles.scss"

export const JournalEntry = () => {
    const markdown = `# 21st of Domak 862nd Year Age of Air, Feywild trane
    
---

Well, now I've seen train, and I still don't know what it is. Some strange hulking mass of metal on wheels, that rides on rainbow. What sort of crazy place is this? And what ride on trane it was. River king warned us that there would be people who meant Babcha harm, and certainly little shits we were accosted by did. Murderous little crazies. First we knew trane suddenly came to complete halt and we set off to find what was wrong. My fellows failed to keep up with me and I was attacked by whole hord of what Babcha called red caps, crazy is what I call them. but we won day soon enough, though I was hurting by end. Damn things. Damn place. Praise be to Llirra that my fellows have magic to heal.

After we'd seen off little manics we went to front of tain to see what was wrong and there was two more of them. but we took them into captivity with little triouble and I bound them. when we got to front of trane one of them was singing, which was strange and seemed very out of character for them. but as soon as we stopped him trane started again. If it hadn't been such serious situation watching Babchago flying would have been funny. I still don't understand this trane, or this place. It's weird

Then we took redcaps back to where we'd been at start, Babcha's farther was still there, still drinking. It was interesting seeing those two, I don't typically think of Babcha as family orientated, but here she was with her farther looking like daughter for first time. It was nice. But I don't like what he said about this final party, hopefully it was just fey hyperbole. You know what they're like.

But those red cap prisoners were no use. No matter what Babcha tried they wouldn't tell us anything. Now one is tied up in bag in corner and other is smear on wall. Eary is scary. She seems to have no inhibitions in this place. I can't imagine her using her ring to hurt someone like that in real world, or really hurting anyone at all. Maybe she is another reason to get out of this place as soon as possible. I hope Babcha gets what she came here for soon.
`
  
    return (
        <div id="journal-entry">
            <MarkdownView
                markdown={markdown}
            />
        </div>
    );
  };
