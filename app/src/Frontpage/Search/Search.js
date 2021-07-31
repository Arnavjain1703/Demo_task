import React, { Component } from 'react'
import Item from './search-item/search-item'
import './Search.css'
class Search extends Component{
    render()
    {   
        return (
            <div className="background">
                <div className="center font padding">
                    <div className="underline">
                    You Can Search For
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-3 col-6">
                        <Item 
                          name="Govt School"
                          class="School"
                          replace="/government_schools"
                          para="
                          Lorem ipsum, or lipsum as it is sometimes,Lorem ipsum, or lipsum as it is sometimes,Lorem ipsum, or lipsum as it is sometimes
                          "
                        image="/assets/school.png"></Item>
                    </div>
                    <div className="col-lg-3 col-6">
                    <Item 
                      name="Ngo"
                      class="Ngo"
                      replace="/government_schools"
                     para="
                     Lorem ipsum, or lipsum as it is sometimes,Lorem ipsum, or lipsum as it is sometimes,Lorem ipsum, or lipsum as it is sometimes
                     "
                    image="/assets/Ngo.png">
                    </Item>
                    </div>
                    <div className="col-lg-3 col-6">
                    <Item image="/assets/Donate.png"
                       name="Donate Here"
                       class="Donate"
                       replace="/donation"
                      para="
                      Lorem ipsum, or lipsum as it is sometimes,Lorem ipsum, or lipsum as it is sometimes,Lorem ipsum, or lipsum as it is sometimes
                      ">
                    </Item>
                    </div>
                    <div className="col-lg-3 col-6">
                    <Item
                     name="Announcements"
                     class="Announcement"
                     replace="/government_schools"
                     para="
                     Lorem ipsum, or lipsum as it is sometimes,Lorem ipsum, or lipsum as it is sometimes,Lorem ipsum, or lipsum as it is sometimes
                     "
                     image="/assets/announcement.png">
                    </Item>
                    </div>
                </div>
            </div>
        )
    }    
    
}
export default Search