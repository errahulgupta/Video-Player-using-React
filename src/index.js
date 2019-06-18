import React,{Component} from "react";
import _ from "lodash";
import ReactDOM from "react-dom";
import YTsearch from "youtube-api-search";

import SearchBar from "./Components/search_bar";
import VideoList from "./Components/video_list";
import VideoDetail from "./Components/video_detail";

const API_KEY = 'AIzaSyBBibvIMI9ZW2ExShWXuzjnYQWH36RGNV0';
YTsearch({key:API_KEY,term:'surfboards'},function(data){
    console.log(data);
});

//Create a new component . this component produces some html
class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            videos:[],
            selectedVideo:null
        };

     this.videoSearch('surfboards');   
    }

    videoSearch(term){
        YTsearch({key:API_KEY,term:term},(videos)=>{
            this.setState({
                videos:videos,
                selectedVideo:videos[0]
            })
        });
    }

    render(){
        const videoSearch = _.debounce((term)=>{this.videoSearch(term)},300);

        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList 
                onVideoSelect = {selectedVideo => this.setState({selectedVideo})}
                videos={this.state.videos}/>
            </div>
        );
    }
}

//Take this component generated html and put it on the page
ReactDOM.render(<App/>,document.querySelector('.container'));