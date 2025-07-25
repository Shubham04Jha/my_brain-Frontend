import { SearchBar } from "../components/SearchBar"
import { ContentFolded } from "../components/ui/ContentFolded"

interface PostsProps{
    sideBarOpen: boolean;
}
export const Posts: React.FC<PostsProps> = ({sideBarOpen})=>{
    return(
        <div className={`${sideBarOpen?'lg:col-start-3':''} col-start-0 col-span-full grid grid-cols-12 lg:gap-8 gap-4 
                pl-8 pr-2 py-2
                overflow-y-auto h-screen scrollbar scrollbar-thumb-gray-500 scrollbar-track-transparent scrollbar-track-sky-300
                `}>
            <SearchBar/>
            <div className='lg:col-span-4 sm:col-span-6 col-span-10 sm:col-start-0 col-start-2 '>
            <ContentFolded isOwner title='This is Title' username='shubahm03jha' thoughts='This is some thoughts' tags={['entertainment','politics']}/>
            </div>
            <div className='lg:col-span-4 sm:col-span-6 col-span-10 sm:col-start-0 col-start-2  '>
            <ContentFolded isOwner title='This is Title' username='shubahm03jha' thoughts='This is some thoughts' tags={['entertainment','politics']}/>
            </div>
            <div className='lg:col-span-4 sm:col-span-6 col-span-10 sm:col-start-0 col-start-2 hover:cursor-pointer'>
            <ContentFolded isOwner title='This is Title isnt it now? what do you think here asdfk asdf asfd some words for the title' username='shubahm03jha' thoughts='This is some thoughts
            lorem ipsum dollar sfdfad afa dfasf ada dfa sdfa dfasdf asdfadf a adfadsfadsfjahsdfadsf  afdjlasdjflas dfalsdfjs fddasdfasd fasdf adfads fasdf adf adfasdf adsfasdf adfadfadf a df afaf asf afasdfa dfas dfasdf aasfdasdf asf adf asdf asdf afdfasfadf adf sdfaf words are added' tags={['entertainment','politics']}/>
            </div>
            <div className='lg:col-span-4 sm:col-span-6 col-span-10 sm:col-start-0 col-start-2  '>
            <ContentFolded isOwner title='This is Title' username='shubahm03jha' thoughts='This is some thoughts' tags={['entertainment','politics']}/>
            </div>
            <div className='lg:col-span-4 sm:col-span-6 col-span-10 sm:col-start-0 col-start-2  '>
            <ContentFolded isOwner title='This is Title' username='shubahm03jha' thoughts='This is some thoughts' tags={['entertainment','politics']}/>
            </div>
            <div className='lg:col-span-4 sm:col-span-6 col-span-10 sm:col-start-0 col-start-2 hover:cursor-pointer'>
            <ContentFolded isOwner title='This is Title isnt it now? what do you think here asdfk asdf asfd some words for the title' username='shubahm03jha' thoughts='This is some thoughts
            lorem ipsum dollar sfdfad afa dfasf ada dfa sdfa dfasdf asdfadf a adfadsfadsfjahsdfadsf  afdjlasdjflas dfalsdfjs fddasdfasd fasdf adfads fasdf adf adfasdf adsfasdf adfadfadf a df afaf asf afasdfa dfas dfasdf aasfdasdf asf adf asdf asdf afdfasfadf adf sdfaf words are added' tags={['entertainment','politics']}/>
            </div>
            <div className='lg:col-span-4 sm:col-span-6 col-span-10 sm:col-start-0 col-start-2  '>
            <ContentFolded isOwner title='This is Title' username='shubahm03jha' thoughts='This is some thoughts' tags={['entertainment','politics']}/>
            </div>
            <div className='lg:col-span-4 sm:col-span-6 col-span-10 sm:col-start-0 col-start-2  '>
            <ContentFolded isOwner title='This is Title' username='shubahm03jha' thoughts='This is some thoughts' tags={['entertainment','politics']}/>
            </div>
        </div>
    )
}