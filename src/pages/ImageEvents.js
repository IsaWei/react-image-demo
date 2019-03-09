/**
 * Created by weijiahui on 2019/3/9.
 */
import React, {Component} from 'react'
import './imageEvent.css'

const imgList = [
    {id: 'head', src: require('../assets/images/head.png')},
    {id: 'doge', src: require('../assets/images/doge.jpg')},
    {id: 'zyl_1', src: require('../assets/images/zyl_1.jpg')},
    {id: 'zyl_2', src: require('../assets/images/zyl_2.jpg')},
    {id: 'zyl_3', src: require('../assets/images/zyl_3.jpg')},
    {id: 'zyl_4', src: require('../assets/images/zyl_4.jpg')},
    {id: 'zyl_5', src: require('../assets/images/zyl_5.jpg')},
    {id: 'zyl_6', src: require('../assets/images/zyl_6.jpg')},
    {id: 'zyl_7', src: require('../assets/images/zyl_7.jpg')},
    {id: 'zyl_8', src: require('../assets/images/zyl_8.jpg')},
    {id: 'zyl_9', src: require('../assets/images/zyl_9.jpg')},
    {id: 'zyl_10', src: require('../assets/images/zyl_10.jpg')}
]

class ImageEvents extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activeImg: 'zyl_1',
            selectedImgList: []
        }
    }

    handleDbclick = (e, item) => {
        e.preventDefault()
        let {selectedImgList} = this.state
        let hasImg = selectedImgList.some(v => {
            return v.id === item.id
        })
        if (hasImg) {
            selectedImgList = selectedImgList.filter(v => {
                return v.id !== item.id
            })
        } else {
            selectedImgList.push(item)
        }
        console.log('==selectedImgList==', selectedImgList)
        this.setState({activeImg: item.id, selectedImgList})
    }

    /**
     * 左右箭头点击回调
     * @param flag 是否向右点击
     */
    handleArrowClick = (flag = true) => {
        let {activeImg} = this.state
        let currentIndex = 0
        for (let i = 0; i < imgList.length; i++) {
            let item = imgList[i]
            if (item.id === activeImg) {
                currentIndex = i
            }
        }
        if (flag) {
            currentIndex = currentIndex + 1 < imgList.length ? (currentIndex + 1) : 0
        } else {
            currentIndex = currentIndex === 0 ? imgList.length - 1 : (currentIndex - 1)
        }
        this.setState({activeImg: imgList[currentIndex]['id']})
        console.log('==currentIndex==', currentIndex)
    }

    render() {
        const {selectedImgList} = this.state
        return (
            <div className="root">
                <div>
                    <img src={require('../assets/svgs/arrow-left.svg')} className="arrow arrow-left"
                         onClick={() => this.handleArrowClick(false)} alt="arrow-left" />
                    <div className="preview-box">
                        {imgList.map((item, index) => {
                            return (
                                <img key={index} title={index} src={item.src} alt="head"
                                     className={`${this.state.activeImg === item.id ? 'img-active' : ''} ${'img-default'}`}
                                     onDoubleClick={(e) => this.handleDbclick(e, item)} />
                            )
                        })}

                    </div>
                    <img src={require('../assets/svgs/arrow-right.svg')} className="arrow arrow-right"
                         onClick={() => this.handleArrowClick(true)} alt="arrow-rigth" />
                </div>
                <div className="select-box">
                    <p>选中的图片</p>
                    <div className="select-part">
                        {selectedImgList.map((item, index) => {
                            return (
                                <img key={index} title={index} src={item.src} alt="head"
                                     className={'img-default'}/>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default ImageEvents

